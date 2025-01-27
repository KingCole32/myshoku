"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type QueryWrapperProps = {
  children: React.ReactNode;
}

const QueryStateWrapper: React.FC<QueryWrapperProps> = ({children}) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        // an hour in ms, time enough that we get an accurate look at what's open now
        staleTime: 3600000,
        retry: false,
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryStateWrapper