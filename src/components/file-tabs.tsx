import { Link, matchPath, useLocation } from "react-router-dom";

import { File } from "../contracts/file";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}
interface FileTabsProps {
  files: File[];
  isEdited: Map<string, boolean>;
}

export function FileTabs({ files, isEdited }: FileTabsProps) {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(files.map((f) => `/editor/${f.id}`));
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab} variant="scrollable" scrollButtons="auto">
      {files.map((f) => (
        <Tab
          sx={{ textTransform: "none" }}
          key={f.id}
          value={`/editor/${f.id}`}
          to={`/editor/${f.id}`}
          component={Link}
          label={isEdited.get(f.id) ? `${f.name} *` : f.name}
        />
      ))}
    </Tabs>
  );
}
