import { useState, useEffect } from "react";
import { useAuth } from "../firebase/useAuth";
import { Body } from "../components/Body";
import { Navbar } from "../components/home/Navbar";
import { Sidebar } from "../components/home/Sidebar";
import { PlusIcon } from "@heroicons/react/24/outline";
import defaultCourseImage from "../assets/defaultAvatar.png";

interface Course {
    id: number;
    title: string;
    imageUrl: string;
}

export const Courses = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const { loggedIn, loading: authLoading, isAdmin } = useAuth();

    useEffect(() => {
        if (authLoading) return;
        if (!loggedIn) return;

        const fetchCourses = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/getCourse", {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Не удалось загрузить курсы");
                const data: Course[] = await res.json();
                setCourses(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, [authLoading, loggedIn]);

    // 2) Добавление нового курса
    const handleAddClick = async () => {
        const title = prompt("Enter course title");
        if (title) {
            try {
                const res = await fetch("http://localhost:8080/api/addCourse", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        imageUrl: defaultCourseImage,
                    }),
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Ошибка при добавлении курса");
                const newCourse = await res.json();
                setCourses((prevCourses) => [...prevCourses, newCourse]);
            } catch (e) {
                console.error(e);
            }
        }
    };

    // 3) Редактирование курса
    const handleEditClick = async (id: number) => {
        const title = prompt("Enter new course title");
        if (title) {
            try {
                const res = await fetch(`http://localhost:8080/api/courses/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                    }),
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Ошибка при редактировании курса");
                const updatedCourse = await res.json();
                setCourses((prevCourses) =>
                    prevCourses.map((course) =>
                        course.id === id ? updatedCourse : course
                    )
                );
            } catch (e) {
                console.error(e);
            }
        }
    };

    // 4) Удаление курса
    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/deleteCourse/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Ошибка при удалении курса");
                setCourses((prevCourses) =>
                    prevCourses.filter((course) => course.id !== id)
                );
            } catch (e) {
                console.error(e);
            }
        }
    };

    if (authLoading || loadingCourses) {
        return <div className="p-8 text-center">Loading…</div>;
    }
    if (!loggedIn) {
        return <div className="p-8 text-center">Please log in to view courses.</div>;
    }

    return (
        <Body>
            <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
                <header className="absolute inset-x-0 top-0 z-50">
                    <Navbar onPress={() => setMobileMenuOpen(true)} />
                    <Sidebar
                        menuValue={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(false)}
                    />
                </header>

                <main>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
                            >
                                <img
                                    src={course.imageUrl || defaultCourseImage}
                                    alt={course.title}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {course.title}
                                    </h3>
                                </div>

                                {isAdmin && (
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button
                                            onClick={() => handleEditClick(course.id)}
                                            className="text-indigo-600 text-sm px-2 bg-white bg-opacity-75 rounded hover:bg-opacity-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="text-red-600 text-sm px-2 bg-white bg-opacity-75 rounded hover:bg-opacity-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isAdmin && (
                            <button
                                onClick={handleAddClick}
                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-indigo-500 transition-colors"
                            >
                                <PlusIcon className="w-10 h-10 text-gray-400 hover:text-indigo-500 transition-colors" />
                                <span className="mt-2 text-gray-600">Add Course</span>
                            </button>
                        )}
                    </div>
                </main>
            </div>
        </Body>
    );
};
