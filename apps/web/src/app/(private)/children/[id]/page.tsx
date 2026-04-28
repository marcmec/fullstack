import ChildPerfil from "@/features/children/child/components/ChildPerfil";
import ChildStats from "@/features/children/child/components/ChildStats";
import { ReviewButton } from "@/features/children/child/components/ReviewButton";
import { ChildPageProps } from "@/features/children/child/types";
import { getAuthToken } from "@/lib/auth";
import { getChild } from "@/services/childrenServices";



const ChildPage = async ({ params }: ChildPageProps) => {
    const { id } = await params;
    const token = await getAuthToken();
    const { data: childData } = await getChild(token!, id);
    return (
        <div className="flex flex-col gap-2">
            <ChildPerfil data={childData} />
            <ChildStats data={childData} />
            {!childData.revisado && <ReviewButton id={childData.id} />}

        </div>
    );
};

export default ChildPage;