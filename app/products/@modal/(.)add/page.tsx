import { Modal } from "@/components/Modal";
import ProductForm from "@/components/ProductForm";

export default async function AddProductModal() {
  return (
    <Modal>
      <ProductForm />
    </Modal>
  );
}
