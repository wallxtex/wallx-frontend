import { useState, useEffect } from "react";
import SharedSchemesRow from "../../../components/shared/SharedSchemesRow";
import { getPublicData } from "../../../services/dealers/dealers.services";
import { addSchemes, updateSchemes, deleteSchemes } from "../../../services/admin/admin.services";
import { Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const AllSchemes = () => {
    const [dealerSchemes, setDealerSchemes] = useState([]);
    const [painterSchemes, setPainterSchemes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editSchemeId, setEditSchemeId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        targetAudience: "DEALER",
        validUntil: "",
        isActive: true
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await addSchemes(formData);

            if (response.success) {
                toast.success("Scheme added successfully!");
                setIsAddModalOpen(false);
                // Reset form
                setFormData({
                    title: "",
                    description: "",
                    targetAudience: "DEALER",
                    validUntil: "",
                    isActive: true
                });

                // Refresh schemes data
                const refreshResponse = await getPublicData();
                if (refreshResponse && refreshResponse.data && refreshResponse.data.activeSchemes) {
                    const allSchemes = refreshResponse.data.activeSchemes;
                    setDealerSchemes(allSchemes.filter(s => s.targetAudience === 'DEALER'));
                    setPainterSchemes(allSchemes.filter(s => s.targetAudience === 'PAINTER'));
                }
            } else {
                console.error("Failed to add scheme:", response.error);
                // toast.error(response.error?.message || "Failed to add scheme. Please try again.");
            }
        } catch (error) {
            console.error("Error adding scheme:", error);
            // toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await updateSchemes(editSchemeId, formData);
            if (response.success) {
                toast.success("Scheme updated successfully!");
                setIsEditModalOpen(false);
                setEditSchemeId(null);
                setFormData({ title: "", description: "", targetAudience: "DEALER", validUntil: "", isActive: true });
                const refreshResponse = await getPublicData();
                if (refreshResponse && refreshResponse.data && refreshResponse.data.activeSchemes) {
                    const allSchemes = refreshResponse.data.activeSchemes;
                    setDealerSchemes(allSchemes.filter(s => s.targetAudience === 'DEALER'));
                    setPainterSchemes(allSchemes.filter(s => s.targetAudience === 'PAINTER'));
                }
            } else {
                // toast.error(response.error?.message || "Failed to update scheme.");
            }
        } catch (error) {
            console.error("Error updating scheme:", error);
            // toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteScheme = async (id) => {
        try {
            const response = await deleteSchemes(id);
            if (response.success) {
                toast.success("Scheme deleted successfully!");
                const refreshResponse = await getPublicData();
                if (refreshResponse && refreshResponse.data && refreshResponse.data.activeSchemes) {
                    const allSchemes = refreshResponse.data.activeSchemes;
                    setDealerSchemes(allSchemes.filter(s => s.targetAudience === 'DEALER'));
                    setPainterSchemes(allSchemes.filter(s => s.targetAudience === 'PAINTER'));
                }
            } else {
                toast.error(response.error?.message || "Failed to delete scheme.");
            }
        } catch (error) {
            console.error("Error deleting scheme:", error);
            // toast.error("An error occurred.");
        }
    };

    const handleUpdateClick = (scheme) => {
        const allSchemes = [...dealerSchemes, ...painterSchemes];
        const rawScheme = allSchemes.find(s => s._id === scheme.id || s.id === scheme.id) || scheme;
        
        setFormData({
            title: rawScheme.title || "",
            description: rawScheme.description || "",
            targetAudience: rawScheme.targetAudience || "DEALER",
            validUntil: rawScheme.validUntil ? new Date(rawScheme.validUntil).toISOString().split('T')[0] : "",
            isActive: rawScheme.isActive ?? true
        });
        setEditSchemeId(scheme.id);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await getPublicData();
                if (response && response.data && response.data.activeSchemes) {
                    const allSchemes = response.data.activeSchemes;
                    setDealerSchemes(allSchemes.filter(s => s.targetAudience === 'DEALER'));
                    setPainterSchemes(allSchemes.filter(s => s.targetAudience === 'PAINTER'));
                }
            } catch (error) {
                console.error("Error fetching active schemes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchemes();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#d82b2b]" />
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col pb-12 sm:pb-16">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-black">
                        Schemes & Offers
                    </h1>
                    <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
                        योजनाएं और प्रस्ताव
                    </p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-[#d82b2b] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm w-fit cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add New Scheme
                </button>
            </div>

            <div className="flex flex-col gap-8">
                {[ 
                    { schemes: dealerSchemes, title: "Dealer Schemes", subtitle: "डीलर योजनाएं", type: "DEALER" },
                    { schemes: painterSchemes, title: "Painter Schemes", subtitle: "पेंटर योजनाएं", type: "PAINTER" }
                ].map((section, index) => (
                    <div key={section.type} className={index > 0 ? "pt-8 border-t border-gray-100" : ""}>
                        {section.schemes.length > 0 ? (
                            <SharedSchemesRow
                                title={section.title}
                                subtitle={section.subtitle}
                                schemes={section.schemes}
                                type={section.type}
                                isAdmin={true}
                                onDelete={handleDeleteScheme}
                                onUpdate={handleUpdateClick}
                            />
                        ) : (
                            <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                <div className="mb-4">
                                    <h2 className="text-base font-semibold text-black">{section.title}</h2>
                                    <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
                                        {section.subtitle}
                                    </p>
                                </div>
                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    No active {section.type.toLowerCase()} schemes available right now.
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add/Edit Scheme Modal */}
            {(isAddModalOpen || isEditModalOpen) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">{isEditModalOpen ? "Edit Scheme" : "Add New Scheme"}</h2>
                            <button
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setIsEditModalOpen(false);
                                    setEditSchemeId(null);
                                    setFormData({ title: "", description: "", targetAudience: "DEALER", validUntil: "", isActive: true });
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-5 overflow-y-auto">
                            <form id="scheme-form" onSubmit={isEditModalOpen ? handleEditSubmit : handleAddSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                        placeholder="Enter scheme title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
                                        placeholder="Describe the scheme details"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience *</label>
                                        <select
                                            name="targetAudience"
                                            value={formData.targetAudience}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
                                        >
                                            <option value="DEALER">Dealer</option>
                                            <option value="PAINTER">Painter</option>
                                            <option value="BOTH">Both</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until *</label>
                                        <input
                                            type="date"
                                            name="validUntil"
                                            value={formData.validUntil}
                                            onChange={handleInputChange}
                                            onClick={(e) => {
                                                try {
                                                    e.target.showPicker();
                                                } catch (err) {
                                                    // Fallback for browsers that don't support showPicker()
                                                }
                                            }}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Active immediately
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setIsEditModalOpen(false);
                                    setEditSchemeId(null);
                                    setFormData({ title: "", description: "", targetAudience: "DEALER", validUntil: "", isActive: true });
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="scheme-form"
                                disabled={isSubmitting}
                                className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white bg-[#d82b2b] rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    isEditModalOpen ? "Update Scheme" : "Save Scheme"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllSchemes;
