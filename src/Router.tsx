import './input.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage, StationChooserPage} from './pages';
import {PrivateRoutes} from './components';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path="*" element={<StationChooserPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};