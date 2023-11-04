import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppRootStateType, AppThunkDispatchType} from "../state/store/store";


// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector