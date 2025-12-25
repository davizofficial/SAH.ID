import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const AgreementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Always redirect to public agreement view for consistency
  useEffect(() => {
    console.log('AgreementDetail redirecting to public view:', id);
  }, [id]);
  
  return <Navigate to={`/agreement/${id}`} replace />;
};

export default AgreementDetail;
