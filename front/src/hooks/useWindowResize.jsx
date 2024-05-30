import * as React from "react";

const useWindowResize = () => {
  const [size, setSize] = React.useState();

  React.useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowResize;
