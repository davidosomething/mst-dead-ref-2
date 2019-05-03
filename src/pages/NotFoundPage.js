import React from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { SvgNoContent } from '../components/NoContent';

export const NotFoundPage = () => {
  useDocumentTitle(`Error - Not Found`);
  return <SvgNoContent />;
};
