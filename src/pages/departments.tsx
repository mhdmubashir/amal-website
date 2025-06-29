import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { departmentService } from "../services/department/department_service";
import { DepartmentData } from "../types";

const DepartmentsPage: React.FC = () => {
    const [departments, setDepartments] = useState<DepartmentData[]>([]);
    const [selected, setSelected] = useState<DepartmentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        departmentService.getDepartments({ page, limit: 10, search })
            .then(data => {
                setDepartments(data.items);
                setTotalPages(data.totalPages);
                setSelected(null);
            })
            .finally(() => setLoading(false));
    }, [page, search]);

    const handleSelect = (id: string) => {
        setLoading(true);
        departmentService.getDepartment(id)
            .then(setSelected)
            .finally(() => setLoading(false));
    };

    if (loading) return <CustomLoader />;

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-2 sm:px-4">
            <div className="max-w-6xl mx-auto">
                <SearchBar value={search} onChange={setSearch} placeholder="Search departments..." />
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 w-full flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                        {departments.map((dep) => (
                            <button
                                key={dep.id}
                                className={`min-w-[180px] md:min-w-0 text-left px-4 py-3 rounded-lg shadow transition font-medium ${selected?.id === dep.id
                                    ? "bg-blue-600 text-white scale-105"
                                    : "bg-white text-gray-800 hover:bg-blue-100"
                                    }`}
                                onClick={() => handleSelect(dep.id!)}
                            >
                                <img src={dep.imageUrl} alt={dep.depName} className="h-12 w-12 object-cover rounded-full mb-2" />
                                <div className="font-semibold truncate">{dep.depName}</div>
                            </button>
                        ))}
                    </div>
                    <div className="md:w-2/3 w-full">
                        {selected ? (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <img src={selected.imageUrl} alt={selected.depName} className="w-48 h-48 object-cover rounded-lg shadow" />
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-blue-900">{selected.depName}</h2>
                                        <p className="text-gray-700 mb-4">{selected.description}</p>
                                        <div className="mb-2"><span className="font-semibold">Duration:</span> {selected.duration} years</div>
                                        <div className="mb-2"><span className="font-semibold">Contact:</span> {selected.contactnum}</div>
                                        {selected.departmenthead && (
                                            <div className="mb-2">
                                                <span className="font-semibold">Head:</span> {selected.departmenthead.name || selected.departmentheadCustom}
                                                <div className="text-sm text-gray-500">{selected.departmenthead.email}</div>
                                            </div>
                                        )}
                                        {selected.syllabusUrl && (
                                            <a href={selected.syllabusUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">View Syllabus</a>
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
