// Utility untuk encode/decode agreement data ke URL
// Ini memungkinkan link agreement diakses dari browser/device manapun

export interface AgreementData {
  id: string;
  title: string;
  recipientAddress: string;
  amount: string;
  description: string;
  creatorAddress: string;
  createdAt: string;
}

/**
 * Encode agreement data ke base64 URL-safe string
 * Data akan disimpan di URL sehingga bisa diakses publik
 */
export function encodeAgreementData(data: AgreementData): string {
  try {
    const jsonString = JSON.stringify(data);
    // Convert to base64 and make URL-safe
    const base64 = btoa(encodeURIComponent(jsonString));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('Error encoding agreement data:', error);
    throw new Error('Failed to encode agreement data');
  }
}

/**
 * Decode agreement data dari base64 URL-safe string
 * Restore data dari URL untuk ditampilkan
 */
export function decodeAgreementData(encoded: string): AgreementData | null {
  try {
    // Restore base64 padding and special chars
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const jsonString = decodeURIComponent(atob(base64));
    const data = JSON.parse(jsonString);
    
    // Validate required fields
    if (!data.id || !data.title || !data.recipientAddress || !data.amount) {
      throw new Error('Invalid agreement data structure');
    }
    
    return data;
  } catch (error) {
    console.error('Error decoding agreement data:', error);
    return null;
  }
}

/**
 * Generate public shareable link dengan embedded data
 */
export function generatePublicLink(data: AgreementData): string {
  const encoded = encodeAgreementData(data);
  const origin = window.location.origin;
  return `${origin}/#/agreement/${data.id}?data=${encoded}`;
}

/**
 * Extract agreement data dari URL query params
 */
export function extractAgreementFromURL(): AgreementData | null {
  try {
    const hash = window.location.hash;
    const queryStart = hash.indexOf('?');
    
    if (queryStart === -1) return null;
    
    const queryString = hash.substring(queryStart + 1);
    const params = new URLSearchParams(queryString);
    const encodedData = params.get('data');
    
    if (!encodedData) return null;
    
    return decodeAgreementData(encodedData);
  } catch (error) {
    console.error('Error extracting agreement from URL:', error);
    return null;
  }
}
