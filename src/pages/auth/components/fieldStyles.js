export const FIELD_INPUT_BASE =
    'w-full h-10 sm:h-11 lg:h-12 border rounded-lg bg-gray-50/50 px-3 sm:px-4 text-xs sm:text-sm lg:text-base transition-all';

export const getFieldBorderClass = (error) =>
    error
        ? 'border-[#d82b2b]'
        : 'border-gray-300 focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b]';
