
import ReactDOM from 'react-dom/client'
import './index.css';
import AppWithRedux from "./App/AppWithRedux";
import {store} from "./state/store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <AppWithRedux />
        </BrowserRouter>
    </Provider>
)




