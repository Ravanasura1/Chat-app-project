function GenderCheck() {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text p-1">Male</span>
          <input type="checkbox" className="checkbox border-slate-900 " />
        </label>
      </div>

      <div className="flex">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text p-1">Female</span>
            <input type="checkbox" className="checkbox border-slate-900" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default GenderCheck;
