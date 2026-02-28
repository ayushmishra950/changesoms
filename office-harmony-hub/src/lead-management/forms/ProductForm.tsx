import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 👉 Replace these with your actual service functions
import { addProduct, updateProduct } from "@/services/Service";

interface ProductFormDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: any;
    setProductListRefresh?: (val: boolean) => void;
}

const ProductForm: React.FC<ProductFormDialogProps> = ({
    isOpen,
    onOpenChange,
    initialData,
    setProductListRefresh,
}) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const isEdit = Boolean(initialData);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });

    // 🔁 Load data for edit mode
    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price?.toString() || "",
            });
        } else {
            resetForm();
        }
    }, [initialData, isOpen]);

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            price: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
            };

            let res;

            // 👉 Replace with real API
            if (isEdit) {
                res = await updateProduct(initialData._id, payload);
            } else {
                res = await addProduct(payload);
            }


            if (res.status === 200 || res.status === 201) {
                toast({
                    title: isEdit ? "Product updated." : "Product added.",
                    description: res?.data?.message,
                });


                setProductListRefresh?.(true);
                resetForm();
                onOpenChange(false);
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: err?.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Product" : "Add Product"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update product details"
                            : "Fill product information"}
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>

                    {/* Product Name */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs">Product Name*</Label>
                        <Input
                            type="text"
                            placeholder="Enter product name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                            className="placeholder:text-xs"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs">Description(Optional)</Label>
                        <Input
                            type="text"
                            placeholder="Enter description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            className="placeholder:text-xs"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs">Price*</Label>
                        <Input
                            type="number"
                            placeholder="Enter price"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            required
                            min="0"
                            className="placeholder:text-xs"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                resetForm();
                                onOpenChange(false);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isLoading ||
                                !form.name ||
                                !form.price
                            }
                        >
                            {isLoading && (
                                <Loader2 className="animate-spin mr-2" />
                            )}
                            {isLoading
                                ? isEdit
                                    ? "Updating..."
                                    : "Adding..."
                                : isEdit
                                    ? "Update"
                                    : "Add"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductForm;