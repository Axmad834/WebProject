import { useState, useEffect } from "react";
import { useAuth } from "../firebase/useAuth";
import defaultAvatar from "../assets/defaultAvatar.png";

// Интерфейс для пользователя
interface User {
    id: number;
    firstName: string | null;
    lastName: string | null;
    age: string | null;
    hobby: string | null;
    photoUrl: string | null;
    email: string;
    role: string | null;
}

const Profile = () => {
    const { loggedIn, loading } = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);  // Состояние для редактирования
    const [updatedData, setUpdatedData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        hobby: "",
        photoUrl: "",
    });

    useEffect(() => {
        if (!loggedIn) return;

        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:8080/profile", {
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setUpdatedData({
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        age: data.age || "",
                        hobby: data.hobby || "",
                        photoUrl: data.photoUrl || "",
                    });
                } else {
                    console.error("Failed to fetch profile data");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [loggedIn]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setIsEditing(false);  // Закрываем форму редактирования
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!loggedIn) return <p>Please log in to view your profile.</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {userData ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <img
                        src={userData.photoUrl || defaultAvatar}
                        alt="User"
                        className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                    />
                    <h1 className="text-2xl font-bold mb-2">
                        {userData.firstName || "Not specified"}
                        {userData.lastName || "- Not specified"}
                    </h1>
                    <p className="text-gray-600 mb-1">📧 {userData.email}</p>
                    <p className="text-gray-600 mb-1">🎂 Age: {userData.age || "N/A"}</p>
                    <p className="text-gray-600 mb-1">🎯 Hobby: {userData.hobby || "Not specified"}</p>

                    {/* Кнопка редактирования */}
                    {!isEditing ? (
                        <button
                            onClick={handleEditClick}
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-4">
                            <input
                                type="text"
                                name="firstName"
                                value={updatedData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="p-2 w-full mb-2 border rounded"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={updatedData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="p-2 w-full mb-2 border rounded"
                            />
                            <input
                                type="text"
                                name="age"
                                value={updatedData.age}
                                onChange={handleChange}
                                placeholder="Age"
                                className="p-2 w-full mb-2 border rounded"
                            />
                            <input
                                type="text"
                                name="hobby"
                                value={updatedData.hobby}
                                onChange={handleChange}
                                placeholder="Hobby"
                                className="p-2 w-full mb-2 border rounded"
                            />
                            <input
                                type="text"
                                name="photoUrl"
                                value={updatedData.photoUrl}
                                onChange={handleChange}
                                placeholder="Photo URL"
                                className="p-2 w-full mb-2 border rounded"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelClick}
                                className="bg-gray-500 text-white p-2 rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <p className="text-center mt-10">No profile data available.</p>
            )}
        </div>
    );
};

export default Profile;



