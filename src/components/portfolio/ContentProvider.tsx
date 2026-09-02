import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Experience, PortfolioContent, Project } from "../../data/types";
import { defaultContent } from "../../data/default-content";
import {
  deleteExperienceFn,
  deleteProjectFn,
  getPortfolioContentFn,
  saveExperienceFn,
  saveProjectFn,
} from "../../functions/content";

type ContentContextValue = {
  content: PortfolioContent;
  loading: boolean;
  dbConfigured: boolean;
  dbReachable: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveExperience: (item: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [dbConfigured, setDbConfigured] = useState(false);
  const [dbReachable, setDbReachable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const result = await getPortfolioContentFn();
      setContent(result.content);
      setDbConfigured(result.dbConfigured);
      setDbReachable(result.dbReachable);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
      setContent(structuredClone(defaultContent));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const saveProject = useCallback(
    async (project: Project) => {
      await saveProjectFn({ data: project });
      await refresh();
    },
    [refresh],
  );

  const deleteProject = useCallback(
    async (id: string) => {
      await deleteProjectFn({ data: { id } });
      await refresh();
    },
    [refresh],
  );

  const saveExperience = useCallback(
    async (item: Experience) => {
      await saveExperienceFn({ data: item });
      await refresh();
    },
    [refresh],
  );

  const deleteExperience = useCallback(
    async (id: string) => {
      await deleteExperienceFn({ data: { id } });
      await refresh();
    },
    [refresh],
  );

  const value = useMemo(
    () => ({
      content,
      loading,
      dbConfigured,
      dbReachable,
      error,
      refresh,
      saveProject,
      deleteProject,
      saveExperience,
      deleteExperience,
    }),
    [
      content,
      loading,
      dbConfigured,
      dbReachable,
      error,
      refresh,
      saveProject,
      deleteProject,
      saveExperience,
      deleteExperience,
    ],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
