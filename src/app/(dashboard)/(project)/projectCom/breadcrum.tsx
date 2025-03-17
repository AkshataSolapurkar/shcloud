
import React from 'react';
import Link from 'next/link';
import { ChevronRight, FileIcon } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  projectId?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, projectId }) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground py-4">
      <div className="mr-2">
        <FileIcon size={16} />
      </div>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} className="mx-2 text-muted-foreground" />}
          {item.path && !item.current ? (
            <Link 
            href={item.path} 
              className="hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.current ? "text-foreground font-medium" : ""}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
      {projectId && (
        <>
          <ChevronRight size={14} className="mx-2 text-muted-foreground" />
          <span className="text-muted-foreground font-mono text-xs">{projectId}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
