import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSubjectForm = () => {
    const [name, setName] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/subject');
            setSubjects(response.data);
        } catch (error) {
            setError('Error fetching subjects');
        } finally {
            setLoading(false);
        }
    };

    const createSubject = async () => {
        setLoading(true);
        try {
            await axios.post('/api/subject', { name });
            fetchSubjects();
            setName('');
        } catch (error) {
            setError('Error creating subject');
        } finally {
            setLoading(false);
        }
    };

    const deleteSubject = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/subject/${id}`);
            fetchSubjects();
        } catch (error) {
            setError('Error deleting subject');
        } finally {
            setLoading(false);
        }
    };

    const editSubject = async (id, newName) => {
        setLoading(true);
        try {
            await axios.put(`/api/subject/${id}`, { name: newName });
            fetchSubjects();
            setEditingId(null);
        } catch (error) {
            setError('Error editing subject');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id, currentName) => {
        setEditingId(id);
        setName(currentName);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setName('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Subjects</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 mr-2"
                    placeholder="Enter subject name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {editingId ? (
                    <>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => editSubject(editingId, name)}
                            disabled={loading}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={handleCancelEdit}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={createSubject}
                        disabled={loading}
                    >
                        Create
                    </button>
                )}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50"></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {subject.id}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {editingId === subject.id ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border p-2"
                                    />
                                ) : (
                                    <div>{subject.name}</div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                {editingId === subject.id ? (
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => editSubject(subject.id, name)}
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="bg-indigo-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleEdit(subject.id, subject.name)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => deleteSubject(subject.id)}
                                            disabled={loading}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateSubjectForm;
