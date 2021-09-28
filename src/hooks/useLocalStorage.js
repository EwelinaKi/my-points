import {useState, useEffect} from "react";
import {getFromLocalStorage, saveToLocalSorage} from "../state/localStorage";

export const useLocalStorage = (key, defaultValue) => {
  
  const initialValue = () => getFromLocalStorage(key) || defaultValue;
  
  const [storage, updateStorage] = useState(initialValue);
  
  useEffect(() => saveToLocalSorage(key, storage), [storage]);
  
  return [storage, updateStorage];
};
