import React from 'react';
import { Department } from '../types';

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <div className={`${department.color} p-4 rounded-lg shadow-md text-white text-center min-w-[200px]`}>
      <img src={department.image} alt={department.name} className="w-full h-32 object-cover rounded-md mb-2" />
      <h3 className="font-semibold">{department.name}</h3>
    </div>
  );
};

export default DepartmentCard;