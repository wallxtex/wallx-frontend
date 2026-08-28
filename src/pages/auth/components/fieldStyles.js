export const FIELD_INPUT_BASE =
    'w-full h-[46px] sm:h-[50px] lg:h-[44px] xl:h-[48px] border rounded-lg bg-gray-50/50 px-3.5 sm:px-4 text-[14px] sm:text-[15px] lg:text-[14px] xl:text-[15px] transition-all';

export const getFieldBorderClass = (error) =>
    error
        ? 'border-[#d82b2b]'
        : 'border-gray-300 focus:border-[#d82b2b] focus:ring-1 focus:ring-[#d82b2b]';
