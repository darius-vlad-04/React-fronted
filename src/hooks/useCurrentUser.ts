import {fetcher} from "../services/fetchService.ts";
import useSWR from "swr";
import type {UserInterface} from "../models/user-models/userInterface.ts";

export function useCurrentUser() {
    const {data, error, isLoading, mutate} = useSWR<UserInterface>('/users/me', fetcher);
    return {
        user: data,
        isLoading,
        isError: error,
        mutateUser: mutate
    };

}
