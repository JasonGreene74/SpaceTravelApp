import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 
 * Displays a 404 message for unmatched routes
 * provides a link back to the homepage
 */

const NotFound = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            history.push('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>You will be redirected to the Home Page shortly.</p>
        </div>
    );
};

export default NotFound;