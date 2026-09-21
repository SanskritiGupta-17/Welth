import { useUser } from "@clerk/expo";
import { useSupabase } from "../useSupabase";
import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "@/lib/services/account";
import { queryKeys } from "@/lib/query/keys";

export function useAccountQuery() {
    const { user } = useUser();
    const supabase = useSupabase();

    return useQuery({
        queryKey: queryKeys.accounts(user?.id),
        queryFn: () => getAccounts(supabase, user!.id),
        enabled: !!user,
    });
}