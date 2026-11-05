import Input from "@/app/component/ui/input";

const page = () => {
  return (
    <section className=" px-60 py-20 w-full">
      <div className=" mx-auto">
        <div className=" bg-white py-3 px-3 ">
            <h1 className=" font-bold">Admin account
</h1>
<p>Your sign-in details</p>

<Input
label="Name"
placeholder="8Xpress"
/>

<Input
label="Email"
placeholder="8Xpress@email.com"
/>
        </div>
      </div>
    </section>
  );
};

export default page;
