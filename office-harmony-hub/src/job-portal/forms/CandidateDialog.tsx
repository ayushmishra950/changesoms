import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Briefcase, User, GraduationCap, CheckCircle, Mail, Phone, DollarSign, MapPin, Backpack, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AddCandidateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCandidateForm: React.FC<AddCandidateFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", resume: null, gender: "male", dob: "", address: "", designation: "", totalExperience: "", relevantExperience: "", currentCTC: "", expectedSalary: "", noticePeriod: "", employmentType: "", preferredLocation: "", skills: "", highestQualification: "", university: "", yearOfPassing: "", status: "", remarks: ""
  });

  const resetForm = () => {
    setForm({
      name: "", email: "", mobile: "", resume: null, gender: "male", dob: "", address: "", designation: "", totalExperience: "", relevantExperience: "", currentCTC: "", expectedSalary: "", noticePeriod: "", employmentType: "", preferredLocation: "", skills: "", highestQualification: "", university: "", yearOfPassing: "", status: "", remarks: ""
    });
    setStep(1);
    setIsLoading(false);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => { resetForm(); onClose() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                {step === 2 && <ArrowLeft className="w-5 h-5 text-gray-700" />}
                <span className="text-lg font-semibold">Add Candidate</span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Add a new candidate to the system. Step-{step}
            </DialogDescription>
          </DialogHeader>
          <form>
            {step === 1 && (
              <>
                <Label className="block mb-2 mt-[-10px] text-xs">Name*</Label>
                <Input type="text" value={form?.name} required onChange={(e) => { setForm({ ...form, name: e.target.value }) }} placeholder="Full name" className="placeholder:text-xs" />
                <div className="flex flex-row justify-between md:mt-1">
                  <div className="flex-1">
                    <Label className="block my-2 text-xs">Email*</Label>
                    <Input type="email" value={form?.email} required onChange={(e) => { setForm({ ...form, email: e.target.value }) }} placeholder="Email address" className="placeholder:text-xs" />
                  </div>
                  <div className="flex-1 ml-2">
                    <Label className="block my-2 text-xs">Mobile*</Label>
                    <Input type="text" value={form?.mobile} maxLength={10} required onChange={(e) => { const onlyNumbers = e.target.value.replace(/\D/g, ''); setForm({ ...form, mobile: onlyNumbers }) }} placeholder="Mobile number" className="placeholder:text-xs" />
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex-1 ">
                    <Label className="block my-2 text-xs">Gender*</Label>
                    <Select value={form?.gender || "male"} required onValueChange={(value: string) => { setForm({ ...form, gender: value }) }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <Input type="text" value={form?.gender} onChange={(e) => { setForm({ ...form, gender: e.target.value }) }} placeholder="Gender" className="placeholder:text-xs" /> */}
                  </div>

                  <div className="flex-1 ml-2">
                    <Label className="block my-2 text-xs">DOB*</Label>
                    <Input type="date" value={form?.dob} required onChange={(e) => { setForm({ ...form, dob: e.target.value }) }} placeholder="Date of birth" className="placeholder:text-xs" />
                  </div>

                </div>

                <Label className="block my-2 text-xs">Address*</Label>
                <Input type="text" value={form?.address} required onChange={(e) => { setForm({ ...form, address: e.target.value }) }} placeholder="Residential address" className="placeholder:text-xs" />
                <div className="flex flex-row justify-between mt-2">
                  <div className="flex-1 ">
                    <Label className="block my-2 text-xs">Desigation*</Label>
                    <Input type="text" value={form?.designation} required onChange={(e) => { setForm({ ...form, designation: e.target.value }) }} placeholder="Current designation" className="placeholder:text-xs" />
                  </div>
                  <div className="flex-1 ml-2 ">
                    <Label className="block my-2 text-xs">Total Experience(years)*</Label>
                    <Input type="text" value={form?.totalExperience} required onChange={(e) => { setForm({ ...form, totalExperience: e.target.value }) }} placeholder="Total experience (yrs)" className="placeholder:text-xs" /> </div>
                </div>
                <div className="flex flex-row justify-between mt-2">
                  <div className="flex-1">
                    <Label className="block my-2 text-xs">Relevant Experience(years)*</Label>
                    <Input type="text" value={form?.relevantExperience} required onChange={(e) => { setForm({ ...form, relevantExperience: e.target.value }) }} placeholder="Relevant experience (yrs)" className="placeholder:text-xs" />
                  </div>
                  <div className="flex-1 ml-2">
                    <Label className="block my-2 text-xs">Current CTC (in LPA)*</Label>
                    <Input type="text" value={form?.currentCTC} required onChange={(e) => { setForm({ ...form, currentCTC: e.target.value }) }} placeholder="Current CTC (in LPA)" className="placeholder:text-xs" />
                  </div>
                </div>
                <div className="flex flex-row justify-end mt-2s">
                  <Button type="button" variant="outline" className="mx-2 my-2" onClick={() => { resetForm(); onClose() }}>Cancel</Button>
                  <Button type="button" variant="default" className="mx-2 my-2" onClick={() => { setStep(2) }} disabled={isLoading || !form?.name || !form?.email || !form?.mobile || !form?.address || !form?.gender || !form?.dob || !form?.address || !form?.designation || !form?.totalExperience || !form?.relevantExperience || !form?.currentCTC}>Next</Button>
                </div>
              </>
            )}
            {
              step === 2 && (
                <>
                  <div className="flex flex-row justify-between">
                    <div className="flex-1">
                      <Label className="block my-2 text-xs">Expected Salary(in LPA)*</Label>
                      <Input type="text" value={form?.expectedSalary} required onChange={(e) => { setForm({ ...form, expectedSalary: e.target.value }) }} placeholder="Expected salary (in LPA)" className="placeholder:text-xs" />
                    </div>
                    <div className="flex-1 ml-2">
                      <Label className="block my-2 text-xs">Notice Period*</Label>
                      <Input type="text" value={form?.noticePeriod} required onChange={(e) => { setForm({ ...form, noticePeriod: e.target.value }) }} placeholder="Notice period" className="placeholder:text-xs" />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex-1">
                      <Label className="block my-2 text-xs">Employment Type*</Label>
                      <Input type="text" value={form?.employmentType} required onChange={(e) => { setForm({ ...form, employmentType: e.target.value }) }} placeholder="Employment type" className="placeholder:text-xs" />
                    </div>
                    <div className="flex-1 ml-2">
                      <Label className="block my-2 text-xs">Preferred Location*</Label>
                      <Input type="text" value={form?.preferredLocation} required onChange={(e) => { setForm({ ...form, preferredLocation: e.target.value }) }} placeholder="Preferred location" className="placeholder:text-xs" />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex-1">
                      <Label className="block my-2 text-xs">Skills*</Label>
                      <Input type="text" value={form?.skills} required onChange={(e) => { setForm({ ...form, skills: e.target.value }) }} placeholder="Key skills" className="placeholder:text-xs" />
                    </div>
                    {/* <div className="flex-1 ml-2">
                      <Label className="block my-2 text-xs">Resume Upload*</Label>
                      <Input type="file" value={form?.resume} required onChange={(e) => { setForm({ ...form, resume: e.target.value }) }} placeholder="Upload resume" className="placeholder:text-xs" />
                    </div> */}

                    <div className="flex-1 ml-2">
                      <Label className="block my-2 text-xs">Resume Upload*</Label>
                      <div className="relative">
                        {/* Hidden actual file input */}
                        <Input
                          type="file"
                          id="resume-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setForm({ ...form, resume: file });
                          }}
                        />

                        {/* Custom styled label */}
                        <label
                          htmlFor="resume-upload"
                          className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-md cursor-pointer text-sm text-gray-600 hover:border-primary hover:bg-primary/5"
                        >
                          {form?.resume ? "form.resume.name" : "Click to upload resume"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex-1">
                      <Label className="block my-2 text-xs">Highest Qualification*</Label>
                      <Input type="text" value={form?.highestQualification} required onChange={(e) => { setForm({ ...form, highestQualification: e.target.value }) }} placeholder="Highest qualification" className="placeholder:text-xs" />
                    </div>
                    <div className="flex-1 ml-2">
                      <Label className="block my-2 text-xs">University/School Name*</Label>
                      <Input type="text" value={form?.university} required onChange={(e) => { setForm({ ...form, university: e.target.value }) }} placeholder="University/School name" className="placeholder:text-xs" />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex-1">
                      <Label className="block my-2 text-xs">Passing Year*</Label>
                      <Input type="text" value={form?.yearOfPassing} required onChange={(e) => { setForm({ ...form, yearOfPassing: e.target.value }) }} placeholder="Year of passing" className="placeholder:text-xs" />
                    </div>
                    <div className="flex-1 ml-2">
                      <Label className="block my-2 text-xs">Candidate Status*</Label>
                      <Input type="text" value={form?.status} required onChange={(e) => { setForm({ ...form, status: e.target.value }) }} placeholder="Candidate status" className="placeholder:text-xs" />
                    </div>
                  </div>
                  <div>
                    <Label className="block my-2 text-xs">Remarks/Notes(Optional)</Label>
                    <Input type="text" value={form?.remarks} onChange={(e) => { setForm({ ...form, remarks: e.target.value }) }} placeholder="Remarks/Notes" className="placeholder:text-xs" />
                  </div>

                  <div className="flex flex-row justify-end">
                    <Button type="button" variant="outline" className="text-sm mx-2 mt-2" onClick={() => { setStep(1) }}>Back</Button>
                    <Button
                      disabled={isLoading || !form.expectedSalary || !form?.noticePeriod || !form?.employmentType || !form?.preferredLocation || !form?.skills || !form?.resume || !form?.highestQualification || !form?.university || !form?.yearOfPassing || !form?.status}
                      type="submit" variant="default" className="text-sm mx-2 mt-2">
                      {isLoading && <Loader2 className="animate-spin" />}
                      {isLoading ? "Submiting..." : "Submit"}
                    </Button>
                  </div>
                </>
              )
            }
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCandidateForm;
