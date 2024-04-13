function GenderCheck({onCheckBoxChange, selectGender}) {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label cursor-pointer ${selectGender === "male" ? "selected" : ""}`}
        >
          <span className="label-text p-1">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 "
            checked={selectGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>

      <div className="flex">
        <div className="form-control">
          <label
            className={`label cursor-pointer ${selectGender === "male" ? "selected" : ""}`}
          >
            <span className="label-text p-1">Female</span>
            <input
              type="checkbox"
              className="checkbox border-slate-900"
              checked={selectGender === "female"}
              onChange={() => onCheckBoxChange("female")}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default GenderCheck;
