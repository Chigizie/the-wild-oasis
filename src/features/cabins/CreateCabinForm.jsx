import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Error from "../../ui/Error";

import { useCreateCabin } from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
import ProductBox from "../training/ProductBox";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const editSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editValues : {},
  });

  console.log();
  const { errors } = formState;
  console.log(errors);

  const { isCreatingCabin, createCabin } = useCreateCabin();
  //REPLACED WITH CUSTOM HOOK
  // const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
  //   mutationFn: createEDitCabin,

  //   onSuccess: () => {
  //     toast.success("new cabin successfully created");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     reset();
  //   },

  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  const { isEditingCabin, editCabin } = useEditCabin();
  // REPLACED WITH CUSTOM HOOK
  // const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
  //   mutationFn: ({ newcabinData, id }) => createEDitCabin(newcabinData, id),

  //   onSuccess: () => {
  //     toast.success(" cabin successfully edited");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] });
  //     reset();
  //   },

  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  const isWorking = isCreatingCabin || isEditingCabin;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (editSession)
      editCabin(
        { newcabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "the value must be  greater than 0" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
        {errors?.regularPrice?.message && (
          <Error> {errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              +value <= getValues().regularPrice ||
              "the value must be less than the regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {editSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>

      <ProductBox />
    </Form>
  );
}

export default CreateCabinForm;
