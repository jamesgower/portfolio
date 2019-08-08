/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import LoadingPage from "../../pages/_misc/components/LoadingPage";

interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P & WithLoadingProps> => ({ loading, ...props }: WithLoadingProps) =>
  loading ? <LoadingPage /> : <Component {...(props as P)} />;

export default withLoading;
