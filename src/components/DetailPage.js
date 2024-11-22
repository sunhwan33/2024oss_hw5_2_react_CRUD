import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/oss_hw4/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setStudent(data);
                } else {
                    console.error('Failed to fetch student data');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const fieldOrder = ['id', 'student_number', 'name', '1_major', '2_major', 'email', 'birthdate', 'rc'];

    return (
        <div className="container my-4">
            <h2>Student Details</h2>
            {student ? (
                <div>
                    {fieldOrder.map((key, index) => (
                        <div className="mb-2" key={index}>
                            <strong>{key.replace(/_/g, ' ')}:</strong> {student[key] || 'N/A'}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading student data...</p>
            )}
        </div>
    );
};

export default DetailPage;
