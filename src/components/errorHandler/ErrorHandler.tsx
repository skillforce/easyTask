import Spinner from '../spinner/Spinner';


export const ErrorHandler =(isLoading:boolean,isError:boolean)=>{
    return(
        <>
            {isLoading && <Spinner/> }
            {isError && <h5 className="text-center mt-5">Ошибка загрузки</h5> }
        </>
    )
}