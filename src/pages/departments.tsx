import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../context/ThemeContext";
import { departmentService } from "../services/department/department_service";
import { DepartmentData } from "../types";

const DepartmentsPage: React.FC = () => {
    const { theme } = useTheme();
    const [departments, setDepartments] = useState<DepartmentData[]>([]);
    const [selected, setSelected] = useState<DepartmentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searching, setSearching] = useState(false);

    // Sync selected department with URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id && departments.length > 0) {
            const found = departments.find(dep => dep.id === id);
            if (found) setSelected(found);
        }
        // eslint-disable-next-line
    }, [departments]);

    // Fetch departments
    useEffect(() => {
        setLoading(true);
        departmentService.getDepartments({ page, limit: 10, search })
            .then(data => {
                setDepartments(data.items);
                setTotalPages(data.totalPages);
                // Select first department or from URL
                const params = new URLSearchParams(window.location.search);
                const id = params.get("id");
                if (id && data.items.length > 0) {
                    const found = data.items.find(dep => dep.id === id);
                    setSelected(found || data.items[0]);
                } else if (data.items.length > 0) {
                    setSelected(data.items[0]);
                    // Update URL to reflect first department
                    window.history.replaceState({}, "", `/departments?id=${data.items[0].id}`);
                } else {
                    setSelected(null);
                }
            })
            .finally(() => setLoading(false));
    }, [page, search]);

    // Handle search loading state
    const handleSearch = (value: string) => {
        setSearching(true);
        setSearch(value);
        setPage(1);
        setTimeout(() => setSearching(false), 400); // Simulate debounce
    };

    const handleSelect = (id: string) => {
        setLoading(true);
        departmentService.getDepartment(id)
            .then(dep => {
                setSelected(dep);
                // Update URL with selected department id
                window.history.replaceState({}, "", `/departments?id=${id}`);
            })
            .finally(() => setLoading(false));
    };

    if (loading) return <CustomLoader />;

    return (
        <main className={`${theme.background} min-h-screen py-10 px-2 sm:px-4`}>
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <div className="mb-4 flex items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                        &larr; Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
                </div>
                <SearchBar value={search} onChange={handleSearch} placeholder="Search departments..." />
                {searching && (
                    <div className="flex justify-center my-4">
                        <span className="text-gray-500 text-sm">Searching...</span>
                    </div>
                )}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 w-full flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                        {departments.map((dep) => (
                            <button
                                key={dep.id}
                                className={`min-w-[180px] md:min-w-0 text-left px-4 py-3 rounded-lg shadow transition font-medium border border-gray-200 ${theme.card} hover:bg-gray-100 ${selected?.id === dep.id
                                    ? "ring-2 ring-green-400 bg-green-50"
                                    : ""
                                    }`}
                                onClick={() => handleSelect(dep.id!)}
                            >
                                <img
                                    src={dep.imageUrl}
                                    alt={dep.depName}
                                    className="h-12 w-12 object-cover rounded-full mb-2 border border-gray-300"
                                />
                                <div className={`font-semibold truncate ${theme.text}`}>{dep.depName}</div>
                            </button>
                        ))}
                    </div>
                    <div className="md:w-2/3 w-full">
                        {selected ? (
                            <div className={`${theme.card} rounded-xl shadow-lg p-8 border border-gray-200`}>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <img
                                        src={selected.imageUrl}
                                        alt={selected.depName}
                                        className="w-48 h-48 object-cover rounded-lg shadow border border-gray-200"
                                    />
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-gray-900">{selected.depName}</h2>
                                        <p className="text-gray-700 mb-4">{selected.description}</p>
                                        {selected.duration && (
                                            <div className="mb-2 text-gray-800">
                                                <span className="font-semibold">Duration:</span> {selected.duration} years
                                            </div>
                                        )}
                                        {selected.contactnum && (
                                            <div className="mb-2 text-gray-800">
                                                <span className="font-semibold">Contact:</span> {selected.contactnum}
                                            </div>
                                        )}
                                        {selected.departmenthead && (
                                            <div className="mb-2 text-gray-800">
                                                <span className="font-semibold">Head:</span>{" "}
                                                {selected.departmenthead.name || selected.departmentheadCustom}
                                                {selected.departmenthead.email && (
                                                    <div className="text-sm text-gray-500">{selected.departmenthead.email}</div>
                                                )}
                                            </div>
                                        )}
                                        {selected.syllabusUrl && (
                                            <a
                                                href={selected.syllabusUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                            >
                                                View Syllabus
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center mt-10">Select a department to view details.</div>
                        )}
                    </div>
                </div>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </main>
    );
};

export default DepartmentsPage;
