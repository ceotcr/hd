export const FormField = ({
    label,
    children,
    error,
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) => (
    <div className="relative mb-4">
        <label className="absolute -top-[10px] left-2 z-10 rounded-3xl bg-white px-2 text-sm text-gray-400">
            {label}
        </label>
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);