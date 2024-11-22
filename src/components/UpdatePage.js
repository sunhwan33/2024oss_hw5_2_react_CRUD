import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const UpdatePage = () => {
    const inputRefs = useRef({});
    const { id } = useParams();
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
    const [editCount, setEditCount] = useState(0);


    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/oss_hw4/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error('Failed to fetch student data');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const validateForm = (field, value) => {
        const newErrors = { ...errors };

        if (!value && field !== '2_major') { // 2_major는 선택사항
            newErrors[field] = `${field.replace(/_/g, ' ')} is required`;
        } else if (field === 'student_number' && !/^\d+$/.test(value)) {
            newErrors[field] = 'Student number must be numeric';
        } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors[field] = 'Invalid email format';
        } else {
            delete newErrors[field];
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            inputRefs.current[field].focus();
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setEditCount((prevCount) => prevCount + 1);

        if (validateForm(name, value)) {
            try {
                await fetch(`https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/oss_hw4/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, [name]: value }),
                });
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
    };

    const fieldOrder = ['id', 'student_number', 'name', '1_major', '2_major', 'email', 'birthdate', 'rc'];

    return (
        <div className="container my-4">
            <h2>Update Student Data</h2>
            <p>Total Edits: {editCount}</p>
            <form>
                {fieldOrder.map((key, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={key} className="form-label">{key.replace(/_/g, ' ')}</label>
                        <input
                            type={key === 'email' ? 'email' : key === 'birthdate' ? 'date' : 'text'}
                            className="form-control"
                            id={key}
                            name={key}
                            value={formData[key] || ''}
                            onChange={handleChange}
                            readOnly={key === 'id'}
                            ref={(el) => (inputRefs.current[key] = el)} // 각 input에 ref 할당
                        />
                        {errors[key] && <small className="text-danger">{errors[key]}</small>}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default UpdatePage;
