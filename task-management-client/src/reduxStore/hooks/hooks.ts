import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from '../store/store'
import { useNavigate } from "react-router-dom";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useCustomNavigate = () => {
    const navigate = useNavigate();

    const customNavigate = (path: any) => {
        navigate(path);
    };

    return customNavigate;
};
