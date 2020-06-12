import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const TabsSkeleton = () => (
  <div className="navigation-sidebar__skeleton">
    <SkeletonTheme color="#455565" highlightColor="#dfe3e8">
      <Skeleton height={19} count={5} />
      <Skeleton height={19} count={3} />
      <Skeleton height={19} count={4} />
    </SkeletonTheme>
  </div>
);

export const MainSkeleton = () => (
  <div className="navigation-sidebar__skeleton">
    <SkeletonTheme color="#dfe3e8" highlightColor="#455565">
      <Skeleton height={19} count={8} />
    </SkeletonTheme>
  </div>
);
