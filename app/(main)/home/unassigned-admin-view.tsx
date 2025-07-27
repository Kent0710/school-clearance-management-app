import {
    ApplyInstitutionAdminForm,
    ApplyOfficeAdminForm,
} from "./apply-admin-form";

const UnassignedAdmin = () => {
    return (
        <section className="flex-[70%] space-y-4">
            <header>
                <h1 className="text-xl font-medium"> Unassigned Admin </h1>
                <p className="text-sm font-medium text-muted-foreground">
                    {" "}
                    Read below on how to properly set up your admin account for
                    an institution.{" "}
                </p>
            </header>
            <section className="flex gap-10">
                <article className="bg-neutral-100 border rounded-lg p-4 shadow-sm flex-1/2">
                    <div>
                        <h2 className="text-lg font-medium">
                            {" "}
                            Apply as an institution admin{" "}
                        </h2>
                        <p>
                            {" "}
                            To apply as an institution admin, you need the{" "}
                            <strong> admin join code. </strong>
                            This is different from the join code used by
                            students and it can be found from the institution
                            dashboard. You need to get it from one of the
                            institution admins.
                        </p>
                    </div>
                    <ApplyInstitutionAdminForm />
                </article>
                <article className="bg-neutral-100 border rounded-lg p-4 shadow-sm flex-1/2">
                    <div>
                        <h2 className="text-lg font-medium">
                            {" "}
                            Apply as an office admin{" "}
                        </h2>
                        <p>
                            {" "}
                            To apply as an office admin, you need the{" "}
                            <strong> admin join code </strong> and
                            <strong> office join code. </strong>
                            Similar above, admin join code is different from the
                            code used by students. You need to get it from one
                            of the institution admins. You can also get the
                            office join code from the office dashboard.
                        </p>
                    </div>
                    <ApplyOfficeAdminForm />
                </article>
            </section>

            <main className="space-y-8">
                <article>
                    <h2 className="text-lg font-medium">
                        {" "}
                        What is an unassigned admin?{" "}
                    </h2>
                    <p>
                        {" "}
                        An unassigned admin is a special role account that can
                        transition from an office admin or an institution admin.
                        From here on, you need to apply to either an office
                        admin or an institution admin. Take note that admin
                        approval is subject to the office or institution that
                        you are joining, it is not automatic.
                    </p>
                </article>
                <article>
                    <h2 className="text-lg font-medium">
                        {" "}
                        What is the difference between an institution admin and
                        an office admin?{" "}
                    </h2>
                    <p>
                        {" "}
                        An institution admin is a special admin role that can
                        manage the institution and the offices under it.
                        Meanwhile, office admin can only manage their own
                        office. Take note that managing means seeing the
                        clearence progress of the students and controlling
                        actions based on their status.
                    </p>
                </article>
                <article>
                    <h2 className="text-lg font-medium">
                        How do i apply as an admin?
                    </h2>
                    <p>
                        Application process is explained below. You can also be
                        an admin by having a communication with the devs.
                        <strong>
                            {" "}
                            However, this communication is only recommended and
                            should be done by certified admins.{" "}
                        </strong>
                    </p>
                </article>

                <article>
                    <div>
                        <h2 className="text-lg font-medium">
                            One at a time application
                        </h2>
                        <p>
                            At this point, you are only allowed to choose either
                            become an institution admin or an office admin. Once
                            you are approved as an admin, you can go to your{" "}
                            <strong> account settings </strong> to configure
                            your admin role.
                        </p>
                    </div>
                </article>
                <article>
                    <div>
                        <h2 className="text-lg font-medium">
                            Automatic process
                        </h2>
                        <p>
                            If you know the devs and know that you are a
                            certified admin of an office, you can communicate
                            with our devs to process your admin application.
                            This is faster but requires direct and valid
                            connection with the devs.{" "}
                            <strong>
                                This process should only be used by certified
                                admins.
                            </strong>
                        </p>
                    </div>
                </article>
            </main>
        </section>
    );
};

export default UnassignedAdmin;
