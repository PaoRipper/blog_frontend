export const useTimeout = (second: number = 2) => {
  const clearTimeoutFnc = (id: any) => {
    return () => {
      clearTimeout(id);
    };
  };

  const delayCallback = (fnc: (...params: any[]) => Promise<any> | any) => {
    const id = setTimeout(async () => {
      try {
        await fnc();
      } catch (e) {
        console.log("error");
      }
      clearTimeoutFnc(id);
    }, second * 1000);
  };

  return { delayCallback };
};
