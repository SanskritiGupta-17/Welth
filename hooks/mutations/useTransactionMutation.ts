import { useUser } from "@clerk/expo";
import { useSupabase } from "../useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertBudget } from "@/lib/services/budgets";
import { createTransaction, deleteTransaction, NewTransaction, Transaction, TransactionType } from "@/lib/services/transactions";

export function useDeleteTransaction() {
    const supabase = useSupabase();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            tx: Pick<Transaction, "id" | "account_id" | "amount" | "type">,
        ) => deleteTransaction(
            supabase,
            tx.id,
            tx.account_id,
            tx.amount,
            tx.type as TransactionType
        ),
        onSuccess: (result, variables, context) => {
            if (result.error) return;
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["account"] });
        },
    });
}

export function useCreateTransaction() {
    const supabase = useSupabase();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: NewTransaction) => createTransaction(supabase, payload),
        onSuccess: (result) => {
            if (result.error) return;
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["account"] });
        },
    });
}