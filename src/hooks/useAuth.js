"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null); // Stores role and name
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            // ✅ Upgraded to getUser() for absolute server-side verification
            const { data: { user }, error } = await supabase.auth.getUser();

            if (user && !error) {
                setUser(user);
                // Fetch the profile data for RBAC and UI personalization
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                setProfile(data);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        };

        fetchUserAndProfile();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/'; // Hard redirect to clear all state
    };

    return { user, profile, loading, signOut };
}