import { useState } from "react";
import { Body } from "../components/Body";
import { Navbar } from "../components/home/Navbar";
import { Sidebar } from "../components/home/Sidebar";
import { PlusIcon } from "@heroicons/react/24/outline";
import defaultCourseImage from "../assets/defaultAvatar.png"; // swap with your own

interface Course {
    id: number;
    title: string;
    imageUrl?: string;
}

export const Courses = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // placeholder array of 12 courses
    const courses: Course[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Course ${i + 1}`,
        imageUrl: defaultCourseImage,
    }));

    const handleAddCourse = () => {
        // TODO: open modal or navigate to add‐course form
        alert("Add new course");
    };

    return (
        <Body>
            <div className="bg-white min-h-screen">
                <header className="absolute inset-x-0 top-0 z-50">
                    <Navbar onPress={() => setMobileMenuOpen(true)} />
                    <Sidebar
                        menuValue={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(false)}
                    />
                </header>

                <main className="pt-24 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Your Courses
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={course.imageUrl}
                                    alt={course.title}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {course.title}
                                    </h3>
                                </div>
                            </div>
                        ))}

                        {/* Add New Course Card */}
                        <button
                            onClick={handleAddCourse}
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-indigo-500 transition-colors"
                        >
                            <PlusIcon className="w-10 h-10 text-gray-400 hover:text-indigo-500 transition-colors" />
                            <span className="mt-2 text-gray-600">Add Course</span>
                        </button>
                    </div>
                </main>
            </div>
        </Body>
    );
};
