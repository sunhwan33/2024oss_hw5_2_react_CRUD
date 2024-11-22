import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await fetch('https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/oss_hw4');
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getList();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/oss_hw4/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // 삭제 후 새로고침
                    setStudents(students.filter(student => student.id !== id));
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };

    return (
        <div className="container my-4">
            <h2>Student List</h2>
            {students.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>#</th>
                            <th>ID</th>
                            <th>Student Number</th>
                            <th>Name</th>
                            <th>1st Major</th>
                            <th>2nd Major</th>
                            <th>Email</th>
                            <th>Birthdate</th>
                            <th>RC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td>
                                    <Link to={`/update/${student.id}`} className="btn btn-warning">Update</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                                <th>{index + 1}</th>
                                <td>{student.id}</td>
                                <td>{student.student_number}</td>
                                <td>{student.name}</td>
                                <td>{student['1_major']}</td>
                                <td>{student['2_major']}</td>
                                <td>{student.email}</td>
                                <td>{student.birthdate}</td>
                                <td>{student.rc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available. Please add data to see the list.</p>
            )}
        </div>
    );
};

export default ListPage;
