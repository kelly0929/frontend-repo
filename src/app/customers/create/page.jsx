"use client";

// Reactのフックをインポート
import { useRef } from "react";
import { useRouter } from "next/navigation";

// 顧客作成APIをインポート
import createCustomer from "./createCustomer";

// 顧客作成ページコンポーネント
export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();

  // フォーム送信ハンドラ
  const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(formRef.current);

  // ✅ バリデーション：各項目を取得
  const customer_name = formData.get("customer_name");
  const customer_id = formData.get("customer_id");
  const age = formData.get("age");
  const gender = formData.get("gender");

  // ✅ バリデーション：空チェック
  if (!customer_name || !customer_name.trim()) {
    alert("顧客名を入力してください");
    return;
  }

  if (!customer_id || !customer_id.trim()) {
    alert("Customer IDを入力してください");
    return;
  }

  if (!age || age === "") {
    alert("年齢を入力してください");
    return;
  }

  if (!gender || !gender.trim()) {
    alert("性別を入力してください");
    return;
  }

  // ✅ すべての入力値が有効なら、バックエンドに送信
  await createCustomer(formData);
  router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
};

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className="input input-bordered"
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className="input input-bordered"
                />
              </p>
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className="input input-bordered"
                />
              </p>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
