import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const inputRefs = useRef({});
    const [formData, setFormData] = useState({
        id: '',
        student_number: '',
        name: '',
        '1_major': '',
        '2_major': '',
        email: '',
        birthdate: '',
        rc: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        let firstInvalidField = null;

        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== '2_major') { // 2_major는 선택사항
                newErrors[key] = `${key.replace(/_/g, ' ')} is required`;
                if (!firstInvalidField) firstInvalidField = key;
            } else if (key === 'student_number' && !/^\d+$/.test(formData[key])) {
                newErrors[key] = 'Student number must be numeric';
                if (!firstInvalidField) firstInvalidField = key;
            } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[key])) {
                newErrors[key] = 'Invalid email format';
                if (!firstInvalidField) firstInvalidField = key;
            }
        });

        setErrors(newErrors);
        if (firstInvalidField) {
            inputRefs.current[firstInvalidField].focus();
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            await fetch('https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/oss_hw4', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            navigate('/list');
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    return (
        <div className="container my-4">
            <h2>Create Student</h2>
            <form>
                {Object.keys(formData).map((key, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={key} className="form-label">{key.replace(/_/g, ' ')}</label>
                        <input
                            type={key === 'email' ? 'email' : key === 'birthdate' ? 'date' : 'text'}
                            className="form-control"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            ref={(el) => (inputRefs.current[key] = el)} // 각 input에 ref 할당
                        />
                        {errors[key] && <small className="text-danger">{errors[key]}</small>}
                    </div>
                ))}
            </form>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreatePage;
