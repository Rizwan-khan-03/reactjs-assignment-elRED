import { Routes, Route, Navigate, Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BioScreen from "./component/Part-A/BioScreen";
import BioEditScreen from "./component/Part-A/BioEditScreen";
import ResumeScreen from "./component/Part-A/ResumeScreen";

function Router() {
    return (
        
                    <Routes>
                        <Route exact path="/" element={<BioScreen />} />
                        <Route exact path="/bioedit" element={<BioEditScreen />} />
                        <Route exact path="/resumescreen" element={<ResumeScreen />} />
                    </Routes>
        
    );
}
export default Router;