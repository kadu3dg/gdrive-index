import useSWR from 'swr';

interface File {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webContentLink?: string;
  thumbnailLink?: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao carregar os arquivos');
  }
  return res.json();
};

export function useFileCache(folderId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<File[]>(
    folderId ? `/api/files?folderId=${folderId}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Não revalidar ao focar na janela
      revalidateOnReconnect: true, // Revalidar ao reconectar
      dedupingInterval: 60000, // Deduplicar requisições em 1 minuto
      focusThrottleInterval: 5000, // Limitar revalidações por foco
      loadingTimeout: 3000, // Timeout para loading
      errorRetryCount: 3, // Número de tentativas em caso de erro
      errorRetryInterval: 5000, // Intervalo entre tentativas
      suspense: false, // Não usar Suspense do React
      keepPreviousData: true, // Manter dados anteriores enquanto carrega novos
    }
  );

  return {
    files: data,
    isLoading,
    isError: error,
    mutate,
  };
} 