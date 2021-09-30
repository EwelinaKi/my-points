import {useState, useEffect} from "react";
import {getFromLocalStorage, saveToLocalStorage, clearLocalStorage} from "../state/localStorage";

export const useLocalStorage = (key, defaultValue) => {
  
  const initialValue = () => getFromLocalStorage(key) || defaultValue;
  
  const [storage, updateStorage] = useState(initialValue);
  
  useEffect(() => {
    storage ? saveToLocalStorage(key, storage) : clearLocalStorage(key)}, [storage]) ;
  
  return [storage, updateStorage];
};
