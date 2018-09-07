import React from 'react';

export default () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} Developer Social Media
            <br></br>
            Made with <i className="fas fa-heart"></i> in Canada
        </footer>
    );
};