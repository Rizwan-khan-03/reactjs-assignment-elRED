export async function fetchMeetUpData() {
    try {
        const response = await fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data?.result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
export async function fetchEthicalCodeData() {
    try {
        const response = await fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
export async function fetchProfessionalSkills() {
    try {
        const response = await fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const skillsArray = data?.result[0].skills;
        const skillres = skillsArray.map((skill) => ({
            value: skill.value,
            label: skill.value,
            id: skill._id
        }));
        
        return skillres;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    }
}

export async function fetchHobbies() {
    try {
        const response = await fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const hobbyArray = data?.result[0].hobbies;
        const hobres = hobbyArray.map((hobby) => ({
            value: hobby.value,
            label: hobby.value,
            id: hobby._id
        }));
        
        return hobres;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    }
}

export async function fetchSubjects() {
    try {
        const response = await fetch('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetSubjectsResponse.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const subArray = data?.result[0].subjects;
        const sub = subArray.map((subject) => ({
            value: subject.value,
            label: subject.value,
            id: subject._id
        }));
        
        return sub;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    }
}
